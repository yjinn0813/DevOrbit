import { MdEmail } from "react-icons/md";
import { ImGithub } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";

const footerLinks = [
  {
    href: "https://github.com/yjinn0813",
    label: "visit github",
    Icon: ImGithub,
  },
  {
    href: "https://www.linkedin.com/in/yjinn0813",
    label: "visit linkedin",
    Icon: FaLinkedin,
  },
  {
    href: "https://hjinn0813.tistory.com",
    label: "visit tech blog",
    Icon: IoBookmark,
  },
  {
    href: "mailto: yjinn0813@gmail.com",
    label: "send email",
    Icon: MdEmail,
  }
]

const Footer = () => {
  return (
    <footer id='footer' className='mt-16 px-4 py-8 flex flex-row justify-between bg-background'>
      <div id='ft-copyright' className='text-sm text-foreground'>
        © 2026 Yujin Cho.
          <br />
          All rights reserved.
      </div>
      <div id='ft-icons' className='flex gap-4 mt-2'>
        {footerLinks.map(({ href, label, Icon }) => (
          <div className='footer-btn' key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-foreground transition-colors hover:text-primary"
            >
              <Icon size={20} />
            </a>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer;