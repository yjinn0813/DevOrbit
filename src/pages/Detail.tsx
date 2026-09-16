/* Detail page */
import { useParams } from "react-router-dom";
import { useGithubUser } from "../hooks/useGithubUser";
import useTitle from '../hooks/useTitle';
import ProfileHeader from '../components/dashboard/ProfileHeader';
import ActivityStats from '../components/dashboard/ActivityStats';
import RepoStats from '../components/dashboard/RepoStats';
import LanguageChart from '../components/dashboard/LanguageChart';
import ContributionTrend from '../components/dashboard/ContributionTrend';
import ActiveRepo from '../components/dashboard/ActiveRepo';
import ContributionStreak from '../components/dashboard/ContributionStreak';
import TierBadge from '../components/dashboard/TierBadge';
import DetailSkeleton from '../components/dashboard/DetailSkeleton';
import Error from './Error';
import NotFound from './NotFound';

// ====================
const Detail = () => {
  const { username } = useParams();
  const { data, isLoading, isError } = useGithubUser(username ?? "");
  useTitle(`${username}`);

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (isError) {
    return <Error />;
  }

  if (!data?.data?.user) {
    return <NotFound />;
  }

  const user = data.data.user;

  // ====================
  return (
    <div className="mx-5 my-7 flex flex-col gap-5">
      {/* Profile + Tier */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
        <div className="md:col-span-3">
          <ProfileHeader user={user} />
        </div>

        <div className="md:col-span-2">
          <TierBadge user={user} />
        </div>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ActivityStats user={user} />
        <RepoStats user={user} />

        <div className="md:col-span-2">
          <LanguageChart user={user} />
        </div>

        <div className="md:col-span-2">
          <ContributionTrend user={user} />
        </div>
      </div>

      {/* repos + streak */}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-5'>
        <div className='md:col-span-2'>
          <ActiveRepo user={user} />
        </div>
        <div className='md:col-span-3'>
          <ContributionStreak user={user} />
        </div>
      </div>
    </div>
  );
};

export default Detail;