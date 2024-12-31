import HomeCarousel from "@/components/HomeCarousel";
import {
  getCategories,
  getMovies,
  OGetMovie,
  Category,
  Country,
  getCountries,
} from "@/lib/api/movie";
import Navbar from "@/components/Navbar";

async function getMovie(): Promise<Omit<OGetMovie, "status" | "message">> {
  const res = await getMovies({});
  if (res?.status && res?.data?.status && res?.data?.data) {
    return {
      data: res.data.data,
      total_items: res.data?.total_items || 0,
      current_page: res.data?.current_page || 0,
      total_pages: res.data?.total_pages || 0,
    };
  }
  return {
    data: [],
    total_items: 0,
    current_page: 0,
    total_pages: 0,
  };
}

async function getCatgory(): Promise<Category[]> {
  const res = await getCategories();
  if (res?.status && res?.data?.status && res?.data?.data) {
    return res.data.data.filter((e) => e?.name);
  }
  return [];
}
async function getCountry(): Promise<Country[]> {
  const res = await getCountries();
  if (res?.status && res?.data?.status && res?.data?.data) {
    return res.data.data.filter((e) => e?.name);
  }
  return [];
}
export default async function Home() {
  const data = await getMovie();
  const cate = await getCatgory();
  const country = await getCountry();
  return (
    <main className="flex flex-col">
      <Navbar categories={cate} countries={country} />
      <HomeCarousel data={data} />
      <div className="container self-center mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
          <div className="bg-blue-500 text-white p-4">Item 1</div>
          <div className="bg-green-500 text-white p-4">Item 2</div>
          <div className="bg-red-500 text-white p-4">Item 3</div>
          <div className="bg-yellow-500 text-white p-4">Item 4</div>
        </div>
      </div>
    </main>
  );
}
