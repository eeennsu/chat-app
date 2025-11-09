import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * 모든 요청 / 경로에 대해 Supabase 세션 쿠키를 동기화 하고, 사용자 인증 상태를 확인해서 로그인 안 된 유저는 로그인 페이지로 리다이렉트 시킴.
 * @param request
 * @returns
 */
export async function updateSession(request: NextRequest) {
  // 미들웨어는 요청을 계속 진행시켜야 하므로 응답 초안을 만듬 (request를 넘겨 기존 컨텍스트를 동일하기 유지)
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 서버용 클라이언트 생성. 서버 런타임에서 쓰는 클라이언트임.
  // 전역변수로 두지 말고 요청마다 새로 만들어야함. 미들웨어 환경은 request가 서로 메모리를 공유할 수 있어 전역 클라이언트 재사용은 세션 누수 / 오작동 위험
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        // 브라우저에서 들어온 기존 쿠키를 Supabase 클라이언트가 읽을 수 있게 해줌
        getAll() {
          return request.cookies.getAll();
        },
        // 세션을 갱신하면서 새 쿠키 설정이 필요할 때 호출
        setAll(cookiesToSet) {
          // 미들웨어 체인의 다음 단계에서도 갱신된 세션을 볼 수 있게 Request 쿠키를 먼저 업데이트
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

          // supabase 요청을 포함한 새 응답객체로 재생성
          supabaseResponse = NextResponse.next({
            request,
          });

          // 같은 쿠키들을 Response 쪽에도 심음
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // createServerClient 직후 곧바로 getClaims()를 호출해야 하기 때문에, 중간에 코드를 넣으면 안됨
  // 이 사이 다른 로직이 끼면 쿠키 동기화 타이밍이 어긋날수도 있어서 랜덤 로그아웃 같은 버그가 발생할 수 있음

  // 현재 supabase 요청의 세션으로 부터 유저 클레임 (jwt claims) 를 꺼냄
  // SSR과 함께 쓸 때 이 호출이 세션 고정 / 연장에 관여하기 때문에 없으면 렌덤 로그아웃 버그 발생 가능
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // 유저 정보가 없고 현재 경로가 login, auth가 아니라면 로그인 페이지로 리다이렉트
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // 쿠키 동기화가 실려있는 응답을 리턴
  return supabaseResponse;
}
