import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Image
                src="/images/logo-blackwolf.png"
                alt="Blackwolf Logo"
                width={149}
                height={43}
                className="h-12 w-auto"
              />
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Blackwolf. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

