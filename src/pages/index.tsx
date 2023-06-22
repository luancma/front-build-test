import { GetStaticProps } from "next";
import axios from "axios";

type DynamicUpdatesProps = {
  dynamicUpdates: {
    payload: {
      body: {
        version: number;
        message: string;
      };
    };
  };
};

type StrapiResponseProps = {
  data?: {
    id: number;
    attributes: {
      Name: string;
      Description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export default function Home({ data, meta }: StrapiResponseProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Testing Build</h1>
      {data?.map((restaurant) => (
        <div key={restaurant.id}>
          <h2>{restaurant.attributes.Name}</h2>
          <p>{restaurant.attributes.Description}</p>
        </div>
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/restaurants}`)
    .then((res) => {
      const response: StrapiResponseProps = {
        data: res.data.data,
        meta: res.data.meta,
      };

      return {
        props: response,
      };
    })
    .catch((err) => {
      return {
        props: {},
      };
    });
};
