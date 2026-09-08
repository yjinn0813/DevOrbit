// DevOrbit Logo

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex flex-row font-bold ${className}`}>
      <div className='text-foreground logo-text-outline'>Dev</div>
      <div className='bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>Orbit</div>
    </div>
  )
}

export default Logo;