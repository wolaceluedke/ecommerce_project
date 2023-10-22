import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import { Headphones, KeyboardIcon, MonitorIcon, MouseIcon, SpeakerIcon, SquareIcon } from "lucide-react";

interface CategoryItemProps {
    category: Category
}


function CategoryItem({category}: CategoryItemProps) {
    const categoryIcon = {
        keyboards: <KeyboardIcon size={16}/>,
        monitors: <MonitorIcon size={16}/>,
        headphones: <Headphones size={16}/>,
        mousepads: <SquareIcon size={16}/>,
        speakers: <SpeakerIcon size={16}/>,
        mouses: <MouseIcon size={16}/>
    }
    return ( 
        <Badge 
        variant="outline" 
        className="py-3 flex justify-center items-center gap-2 rounded-lg "
        >
            {categoryIcon[category.slug as keyof typeof categoryIcon]}
            <span className="text-xs font-bold">{category.name}</span>
        </Badge>
     );
}

export default CategoryItem;