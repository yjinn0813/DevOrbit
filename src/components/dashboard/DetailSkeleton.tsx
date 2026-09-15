/* Detail page - Skeleton components */
import React from 'react';
import ProfileSkeleton from './skeleton/ProfileSkeleton';
import ActivitySkeleton from './skeleton/ActivitySkeleton';
import RepoSkeleton from './skeleton/RepoSkeleton';
import LanguageSkeleton from './skeleton/LanguageSkeleton';

const DetailSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-5 mx-5 my-7 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <ProfileSkeleton />
      </div>

      <ActivitySkeleton />
      <RepoSkeleton />

      <div className="lg:col-span-2">
        <LanguageSkeleton />
      </div>
    </div>
  );
}

export default DetailSkeleton;