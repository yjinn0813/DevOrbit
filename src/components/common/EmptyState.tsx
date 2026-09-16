/* 데이터 없을 경우 예외처리 */

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({
  message = 'No data available.',
}: EmptyStateProps) => {
  return (
    <div className="flex min-h-40 items-center justify-center text-base text-muted-foreground">
      {message}
    </div>
  );
};

export default EmptyState;