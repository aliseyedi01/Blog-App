import React from "react";
import PageMetaHead from "@/components/MetaHead/PageMetaHead";
import Image from "next/image";
import { ScrollTop } from "primereact/scrolltop";
import { ScrollPanel } from "primereact/scrollpanel";
import { useRouter } from "next/router";
import ImagePlaceholder from "@/public/image/PlaceHolderImage.png";
import { Button } from "primereact/button";
import { getDataApi } from "@/lib/getDataApi";

export default function SinglePost({ articles }) {
  const router = useRouter();
  const IdArticle = router.query.bid;
  const article = articles?.find((item) => item.title == IdArticle);

  if (!article) {
    return null; // or render a loading spinner
  }

  const backRoute = () => {
    router.back();
  };

  return (
    <div className="h-screen pb-11 w-full bg-sky-200  ">
      <ScrollPanel className=" w-full h-full ">
        <PageMetaHead title={article.title} />
        <div className="p-4 flex flex-col w-full ">
          <div className="flex items-baseline justify-start">
            <Button
              icon="pi pi-arrow-left"
              text
              severity="info"
              aria-label="User"
              onClick={backRoute}
            />
            <h2 className="text-xl font-semibold mb-4 p-3 pb-0 ">{article.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 pt-4 bg-red-600   place-content-center w-full px-2 gap-5 ">
            <div>
              <Image
                src={article?.urlToImage ? article.urlToImage : ImagePlaceholder}
                alt={article.title}
                width={900}
                height={300}
                priority
                className="h-80 w-auto shadow-2xl object-cover rounded-lg cursor-pointer"
              />
            </div>
            <div className="w-full ">
              <p className="text-sky-800 text-2xl w-full my-4">{article.description}</p>
              <p className="text-sky-600 text-xl w-full my-4">{article.content}</p>
            </div>
          </div>
        </div>
        <ScrollTop
          target="parent"
          threshold={200}
          className="w-2rem h-2rem border-round-md bg-primary	 "
          icon="pi pi-chevron-up text-base"
        />
      </ScrollPanel>
    </div>
  );
}

export async function getStaticProps() {
  const articles = await getDataApi();

  return {
    props: { articles },
  };
}

export async function getStaticPaths() {
  const articles = await getDataApi();

  const paths = articles.map((articles) => ({ params: { bid: articles.title } }));

  return {
    paths: paths,
    fallback: true,
  };
}
