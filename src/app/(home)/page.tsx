import Image from 'next/image'
import Categories from './components/categories'
import { prismaClient } from '@/lib/prisma'
import ProductList from './components/product-list'

export default async function Home() {
    const deals = await prismaClient.product.findMany({
        where: {
            discountPercentage:{
                gt: 0,
            }
        }
    })
return <div className=''>
    <Image 
    src="/banner-home-01.png"
    height={0}
    width={0}
    className='h-auto w-full px-5'
    sizes='100vw'
    alt='até 55% desconto só esse mês'
    />
    <div className='mt-6 px-5'>
    <Categories />
    </div>
    <div className='mt-8'>
        <p className='font-bold uppercase pl-5 mb-3'>Ofertas</p>
        <ProductList products={deals} />
    </div>

    <Image 
    src="/banner-home-02.png"
    height={0}
    width={0}
    className='h-auto w-full px-5'
    sizes='100vw'
    alt='até 55% desconto em mouses'
    />
</div>
  
}
