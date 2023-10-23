import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon} from "lucide-react";
import { Badge } from './badge'
import Image from 'next/image'

interface ProductItemProps {
    product: ProductWithTotalPrice; 
}

const ProductItem = ({ product }: ProductItemProps) => {
    return <div className="flex flex-col gap-4 max-w-[156px]">
        <div className="relative flex h-[170px] w-[156px]  items-center justify-center rounded-lg bg-accent">
        <Image 
        src={product.imageUrls[0]}
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto max-h-[70%] w-auto max-w-[80%]"
        style={{
            objectFit: "contain",
        }}
        alt={product.name}
        />

        {product.discountPercentage > 0 && (
            <Badge className="absolute left-3 top-3 px-2 py-[2px]">
                <ArrowDownIcon size={12}/>{product.discountPercentage}%
                </ Badge>
        )}
       </div>

      

       <div className="flex flex-col gap-1">
        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>

        <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
                <>
                <p className="font-semibold">
                    R$ {product.totalPrice.toFixed(2)}</p>

                <p className="text-xs opacity-75 line-through">
                    R$ {Number(product.basePrice).toFixed(2)}</p>
                </>
            ) : (
                <p className="text-xs opacity-75 line-through">
                R$ {product.basePrice.toFixed(2)}</p>
            )}
           
              
        </div>
       </div>
    </div>
}
 
export default ProductItem;