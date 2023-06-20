import { GetStaticProps } from "next";
import axios from "axios";

export default function Home({
  dynamicUpdates,
}: {
  dynamicUpdates?: {
    payload: {
      body: {
        version: number;
        message: string;
      };
    };
  };
}) {
  console.log(process.env.NEXT_PUBLIC_BACKEND);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Testing Build</h1>
      <p className="text-2xl">
        {dynamicUpdates?.payload.body.version || "No version"}
      </p>
      <p className="text-2xl">
        {dynamicUpdates?.payload.body.message || "No message"}
      </p>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND}/webhook`)
    .then((response) => {
      const data = response.data;
      return {
        props: {
          dynamicUpdates: data,
        },
      };
    })
    .catch((error) => {
      return {
        props: {},
      };
    });
};
