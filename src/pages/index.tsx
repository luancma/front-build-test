import { GetStaticProps } from "next";
import axios from "axios";

type DynamicUpdatesProps = {
  content: {
    version: number;
    message: string;
  };
};

export default function Home({ content }: DynamicUpdatesProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Testing Build</h1>
      <h2>{content?.version}</h2>
      <p>{content?.message}</p>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return axios
    .get(`http://127.0.0.1:3001/content`)
    .then((res) => {
      return {
        props: {
          content: {
            version: res.data.version,
            message: res.data.message,
          },
        },
      };
    })
    .catch((err) => {
      return {
        props: {
          content: {
            version: 0,
            message: "Error",
          },
        },
      };
    });
};
