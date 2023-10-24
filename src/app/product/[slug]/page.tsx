import { prismaClient } from "@/lib/prisma";
import ProductImages from "../components/procuct-images";
import ProductInfo from "../components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

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
        <div className="flex flex-col gap-8">
            <ProductImages imageUrls={product.imageUrls} name={product.name} />
            <ProductInfo product={computeProductTotalPrice(product)} />
        </div>
    </h1>
}
 
export default ProductDetailsPage;