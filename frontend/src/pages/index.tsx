import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { parseCookies } from "nookies"
import { TableTransactions } from "../components/TableTransactions";

export default function Home() {

  return (
    <Layout>
      <TableTransactions />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: '/authenticated',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}