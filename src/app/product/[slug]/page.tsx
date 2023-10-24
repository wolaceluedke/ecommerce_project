import { prismaClient } from "@/lib/prisma";
import ProductImages from "../components/procuct-images";

interface ProductDetailsPageProps {
    params: {
        slug: string,
    }
}


const ProductDetailsPage = async ({
    params: { slug },
}: ProductDetailsPageProps) => {
    const product = await prismaClient.product.findFirst({
        where: {
            slug: slug,
        },
    });
    
    if(!product) return null;

    return <h1>
        <div>
            <ProductImages imageUrls={product.imageUrls} name={product.name} />
        </div>
    </h1>
}
 
export default ProductDetailsPage;