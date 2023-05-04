import {useTheme} from 'next-themes'

export default function Header() {
	const {theme, setTheme} = useTheme()

	return (
	  <header className="container mx-auto flex justify-between h-24 items-center">
		<a href='/' className = "font-bold text-xl">
		 LIBRA
		</a>
	  </header>
	);
  }