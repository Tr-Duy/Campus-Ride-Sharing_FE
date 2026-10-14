import { useEffect, useId, useRef, useState } from 'react';
import { Headphones, MessageCircle, Phone, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOTLINE, ZALO_PHONE } from '../../utils/constants';

export default function FloatingSupport() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const chatId = useId();
  const supportRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const trigger = triggerRef.current;
    supportRef.current?.querySelector<HTMLAnchorElement>('.support-action')?.focus();
    const closeOnOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !supportRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); trigger?.focus(); }
    };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!chatOpen) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setChatOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      trigger?.focus();
    };
  }, [chatOpen]);

  return (
    <aside ref={supportRef} className="floating-support" aria-label="Hỗ trợ khách hàng">
      {chatOpen && <section id={chatId} className="support-chat-panel" role="dialog" aria-labelledby="support-chat-title">
        <header className="support-chat-header">
          <div><Sparkles size={19} aria-hidden="true" /><h2 id="support-chat-title">Chatbot AI</h2></div>
          <button ref={closeRef} type="button" aria-label="Đóng cửa sổ hỗ trợ" onClick={() => setChatOpen(false)}><X size={20} aria-hidden="true" /></button>
        </header>
        <div className="support-chat-content">
          <p className="support-chat-greeting">Bạn cần hỗ trợ hành trình nào?</p>
          <p className="support-chat-status">Chatbot AI chưa được kết nối. Bạn có thể xem thông tin dưới đây hoặc liên hệ qua Hotline, Zalo.</p>
          <nav aria-label="Thông tin hỗ trợ">
            <Link to="/fares" onClick={() => setChatOpen(false)}>Xem giá cước tham khảo →</Link>
            <Link to="/policies" onClick={() => setChatOpen(false)}>Chính sách &amp; câu hỏi thường gặp →</Link>
            <Link to="/my-trips" onClick={() => setChatOpen(false)}>Quản lý chuyến của tôi →</Link>
          </nav>
          <small>Thông tin liên hệ hiện là dữ liệu mẫu của bản demo.</small>
        </div>
      </section>}
      {menuOpen && <nav id={menuId} className="floating-support-actions" aria-label="Kênh liên hệ nhanh">
        <span className="support-menu-heading">Bạn cần hỗ trợ?</span>
        <a className="support-action" href={`tel:${HOTLINE.replace(/\s/g, '')}`} title={`Hotline ${HOTLINE} — số mẫu demo`}><Phone size={17} aria-hidden="true" /><span>Hotline</span></a>
        <a className="support-action" href={`https://zalo.me/${ZALO_PHONE.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" title={`Zalo ${ZALO_PHONE} — số mẫu demo`}><MessageCircle size={17} aria-hidden="true" /><span>Zalo</span></a>
        <button className="support-action support-action-ai" type="button" aria-controls={chatOpen ? chatId : undefined} aria-haspopup="dialog" onClick={() => { setMenuOpen(false); setChatOpen(true); }}><Sparkles size={17} aria-hidden="true" /><span>Chatbot AI</span></button>
      </nav>}
      <button ref={triggerRef} className="support-launcher" type="button" aria-label={menuOpen || chatOpen ? 'Đóng hỗ trợ' : 'Mở hỗ trợ'}
        aria-expanded={menuOpen || chatOpen} aria-controls={chatOpen ? chatId : menuOpen ? menuId : undefined}
        onClick={() => { if (chatOpen) setChatOpen(false); else setMenuOpen(!menuOpen); }}>
        {menuOpen || chatOpen ? <X size={21} aria-hidden="true" /> : <Headphones size={21} aria-hidden="true" />}<span>Hỗ trợ</span>
      </button>
    </aside>
  );
}
