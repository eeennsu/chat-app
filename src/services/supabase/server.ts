import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { Database } from './types/database';

// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY란 브라우저에 노출되어도 되는 키 (공개 적인 출입증)

// 로그인한 유저의 권한으로 DB에 접근할 때 사용
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll(); // 브라우저에서 보낸 쿠키를 supabase 에 전달
        },
        setAll(cookiesToSet) {
          try {
            // supabase가 세션을 갱신하거나 로그아웃할 때 쿠키를 심으려 시도함
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 에러는 무시. Server Component는 렌더링 중에 쿠키를 set 할 수 없음.
            // 만약 여기서 에러가 나도 middleware가 새션을 갱신해주므로 괜찮음
          }
        },
      },
    },
  );
}

// 관리자용 슈퍼 클라이언트
export async function createAdminClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll() {
          return []; // 정보 필요없으므로
        },
      },
    },
  );
}
