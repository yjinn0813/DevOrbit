/* Detail page - Skeleton components */
import React from 'react';
import ProfileSkeleton from './skeleton/ProfileSkeleton';
import TierSkeleton from './skeleton/TierSkeleton';
import ActivitySkeleton from './skeleton/ActivitySkeleton';
import RepoSkeleton from './skeleton/RepoSkeleton';
import LanguageSkeleton from './skeleton/LanguageSkeleton';
import TrendSkeleton from './skeleton/TrendSkeleton';
import StreakSkeleton from './skeleton/StreakSkeleton';
import ActiveRepoSkeleton from './skeleton/ActiveRepoSkeleton';

const DetailSkeleton: React.FC = () => {
  return (
    <div className="mx-5 my-7 flex flex-col gap-5">
      {/* Profile + Tier */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
        <div className="md:col-span-3">
          <ProfileSkeleton />
        </div>

        <div className="md:col-span-2">
          <TierSkeleton />
        </div>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ActivitySkeleton/>
        <RepoSkeleton />

        <div className="md:col-span-2">
          <LanguageSkeleton />
        </div>

        <div className="md:col-span-2">
          <TrendSkeleton />
        </div>

        <ActiveRepoSkeleton />
        <StreakSkeleton />
      </div>
    </div>
  );
}

export default DetailSkeleton;