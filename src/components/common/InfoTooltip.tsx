/* Detail page - info tooltip */

import { Info } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface InfoTooltipProps {
  content: string;
}

// ====================
const InfoTooltip = ({ content }: InfoTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger aria-label='more infomation'>
        <Info size={15} className="text-muted-foreground" />
      </TooltipTrigger>

      <TooltipContent className="border border-secondary/50 shadow-md">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default InfoTooltip;