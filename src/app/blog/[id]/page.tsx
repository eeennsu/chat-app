const Page = async ({ params, searchParams }: PageProps<'/blog/[id]'>) => {
  const { id } = await params;
  const query = await searchParams;

  return (
    <h1>
      Blog Post: {id}
      {JSON.stringify(query)}
    </h1>
  );
};

export default Page;
