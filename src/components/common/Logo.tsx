// DevOrbit Logo

const Logo = () => {
  return (
    <div className='flex flex-row gap-2 items-center'>
      <img src="/favicon/DevOrbit.svg" alt="DevOrbit" height="34" width="34" />
      <div className='flex flex-row font-bold text-xl'>
        <div className='text-foreground'>Dev</div>
        <div className='bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>Orbit</div>
      </div>
    </div>
  )
}

export default Logo;