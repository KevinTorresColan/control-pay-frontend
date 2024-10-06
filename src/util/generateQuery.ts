const generateQuery = <T extends Record<string, string>>(data: T, route: string) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== '' && value !== undefined)
  );
  const query = new URLSearchParams(filteredData).toString();
  
  return  query ? `${route}?${query}` : route;
}

export default generateQuery;