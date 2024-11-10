import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaReact } from "react-icons/fa";

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  // WhatsApp message with product details
  const whatsappMessage = `Hello, I'm interested in purchasing "${name}" priced at ${currency}${price}. Could you please confirm the availability?`;

  const whatsappLink = `https://wa.me/2349013213160?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="product-item">
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div>
          <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-xm font-medium'>{currency}{price}</p>
      </Link>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        <button className="bg-green-500 text-white px-3 py-1 rounded">
          <FaWhatsapp />
        </button>
      </a>
    </div>
  );
}

export default ProductItem;
