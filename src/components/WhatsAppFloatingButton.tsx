import whatsappIcon from "@/assets/whatsapp-icon.png";

const WhatsAppFloatingButton = () => {
  const handleClick = () => {
    window.open("https://wa.me/6281381528559", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:scale-105 transition-all"
    >
      <img src={whatsappIcon} alt="WhatsApp" className="w-7 h-7" />
    </button>
  );
};

export default WhatsAppFloatingButton;
