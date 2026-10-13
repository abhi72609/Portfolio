function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050605] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <a href="/" className="text-xl font-semibold tracking-tight text-white">
          Portfo<span className="text-[#72977A]">lio.</span>
        </a>

        <p className="text-center text-sm text-gray-500">
                    ©Portfolio All Rights Reserved by
                    Portfolio | Created & Managed by Amitash & Abhishek 
                </p>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Portfolio
        </p>
      </div>
    </footer>
  );
}

export default Footer;
