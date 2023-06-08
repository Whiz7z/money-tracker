import MainBlock from "../components/MainBlock";
import Auth from "@/components/Auth";

export default function Home() {
  return (
    <main
      className="flex h-screen w-screen bg-fill justify-center items-center  text-[2.2rem]
       align-middle text-center m-auto"
    >
      <MainBlock>
        <Auth />
      </MainBlock>
    </main>
  );
}
