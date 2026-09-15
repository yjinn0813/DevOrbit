/* Detail page */
import { useParams } from "react-router-dom";
import { useGithubUser } from "../hooks/useGithubUser";
import ProfileHeader from '../components/dashboard/ProfileHeader';
import ActivityStats from '../components/dashboard/ActivityStats';
import RepoStats from '../components/dashboard/RepoStats';
import LanguageChart from '../components/dashboard/LanguageChart';
import DetailSkeleton from '../components/dashboard/DetailSkeleton';
import Error from './Error';
import NotFound from './NotFound';

// ====================
const Detail = () => {
  const { username } = useParams();
  const { data, isLoading, isError } = useGithubUser(username ?? "");

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
  
  return (
    <div className="grid grid-cols-1 gap-5 mx-5 my-7 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <ProfileHeader user={user} />
      </div>

      <ActivityStats user={user} />
      <RepoStats user={user} />

      <div className="lg:col-span-2">
        <LanguageChart user={user} />
      </div>
    </div>
  );
};

export default Detail;