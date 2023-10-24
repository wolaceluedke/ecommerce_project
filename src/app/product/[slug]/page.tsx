import { prismaClient } from "@/lib/prisma";
import ProductImages from "../components/procuct-images";
import ProductInfo from "../components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";

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
        include: {
            category: {
                include: {
                    products: {
                        where: {
                            slug: {
                                not: slug,
                            }
                        }
                    }
                }
            }
        }
    });

    console.log(product)
    
    if(!product) return null;

    return <h1>
        <div className="flex flex-col gap-8 pb-8">
            <ProductImages imageUrls={product.imageUrls} name={product.name} />
            <ProductInfo product={computeProductTotalPrice(product)} />
           <div>
           <SectionTitle>Produtos Recomendados</SectionTitle>
            <ProductList products={product.category.products}/>
           </div>
        </div>
    </h1>
}
 
export default ProductDetailsPage;