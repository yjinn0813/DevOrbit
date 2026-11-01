/* custom share popover */

import { toast } from 'sonner';
import { copyToClipboard } from '../../utils/copyClipboard';
import { useShare } from '../../hooks/useShare';
import { CiShare2 } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";

// ====================
const SharePopover = () => {
  // Web Share API 지원 여부 확인
  const { isShareSupported, share } = useShare();

  const handleShare = async () => {
    if (isShareSupported) {
      try {
        await share();
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;

        toast.error('Sharing failed!', {
          description: 'Something went wrong. Please try again.',
        });
      }
    } else {
      toast.error('Sharing unavailable!', {
        description: 'Your browser does not support this feature.',
      });
    }
  };

  // Copy link
  const handleShareClick = async () => {
    try {
      await copyToClipboard();
      toast.success('Link copied!', {
        description: 'Link copied successfully.',
      });
    } catch {
      toast.error('Copy failed!', {
        description: 'Please check your browser settings.',
      });
    }
  };

  // ====================
  return (
    <div className='flex flex-col gap-2.5'>
      <div className='flex flex-col gap-0.5'>
        <h2 className='text-lg font-semibold text-background dark:text-foreground'>Share</h2>
        <p className='text-sm text-muted-foreground'>
          Share this developer profile with others!
        </p>
      </div>

      <div className='flex flex-col gap-2.5 mt-2'>
        {isShareSupported && (
          <button
            onClick={handleShare}
            className="cursor-pointer flex flex-row items-center gap-3 p-3 
              border border-muted-foreground/50 rounded-lg 
              hover:bg-secondary/30 hover:border-secondary/30
              dark:border-muted-foreground/50 dark:hover:bg-muted/90"
          >
            <CiShare2 className="h-5 w-5 text-muted-foreground" />
            <div className="flex flex-col items-baseline gap-0.5">
              <h2 className="text-sm font-medium text-background dark:text-foreground">Share Externally</h2>
              <p className="text-xs text-muted-foreground">Share using your device.</p>
            </div>
          </button>
        )}

        <button
          onClick={handleShareClick}
          className="cursor-pointer flex flex-row items-center gap-3 p-3 
            border border-muted-foreground/50 rounded-lg 
            hover:bg-secondary/30 hover:border-secondary/30
            dark:border-muted-foreground/50 dark:hover:bg-muted/90"
        >
          <IoCopyOutline className="h-5 w-5 text-muted-foreground" />
          <div className="flex flex-col items-baseline gap-0.5">
            <h2 className="text-sm font-medium text-background dark:text-foreground">Copy Link</h2>
            <p className="text-xs text-muted-foreground">Copy this link to share.</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SharePopover;