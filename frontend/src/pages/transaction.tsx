import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { parseCookies } from "nookies"
import { FormTransanction } from "../components/FormTransaction";

export default function Transaction() {
    return (
        <Layout >
            <FormTransanction />
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