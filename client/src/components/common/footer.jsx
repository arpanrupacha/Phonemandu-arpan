import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="col-span-2">
          {/* <div className="flex items-center gap-2 mb-4">
            <img
              src={require("../../assets/phonemandu-logo.png")}
              alt="Phonemandu Logo"
              className="h-10"
            />
          </div> */}
          <p className="text-sm leading-relaxed font-medium mb-4">
            Phonemandu is your go-to online store for the latest electronic
            gadgets in Nepal. Whether you’re looking for top-rated smartphones,
            powerful laptops, sleek tablets, or everyday accessories like
            earphones, smartwatches, and chargers we’ve got it all under one
            roof.
          </p>
          <p className="text-sm leading-relaxed font-medium mb-4">
            Enjoy fast nationwide delivery, hassle-free returns, and free
            shipping on all orders. Found what you’re looking for? Great! Just
            type it in the search bar and grab it at the best deal in town —
            only at Phonemandu, where technology meets trust.
          </p>
          <p className="text-sm font-bold">ADDRESS:</p>
          <p className="text-sm mb-2">150 meters ahead of New Road Gate</p>
          <p className="text-sm font-bold">PHONE:</p>
          <p className="text-sm mb-2">+977-9801100037</p>
          <p className="text-sm font-bold">EMAIL:</p>
          <p className="text-sm">phonemandu@gmail.com</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-gray-400 font-medium transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-400 font-medium transition-colors"
              >
                Returns
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-gray-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Phonemandu. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;