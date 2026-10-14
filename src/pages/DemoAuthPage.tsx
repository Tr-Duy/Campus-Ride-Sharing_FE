import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { demoApiService } from '../services/demo.api';
import { validPhone, passwordStrength } from '../utils/format';
import MapSVG from '../components/common/MapSVG';

export default function DemoAuthPage({ path }: { path: string }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedReturn = searchParams.get("returnTo");
  const destination = requestedReturn?.startsWith("/") && !requestedReturn.startsWith("//") ? requestedReturn : "/book";
  const { user, setUser, showToast } = useApp();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwStrength, setPwStrength] = useState('');
  const [otpUntil, setOtpUntil] = useState(0);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  const titles: Record<string, string> = {
    '/login': 'Chào mừng trở lại',
    '/register': 'Bắt đầu hành trình',
    '/verify-account': 'Xác thực tài khoản',
    '/forgot-password': 'Lấy lại mật khẩu',
    '/reset-password': 'Tạo mật khẩu mới',
    '/account': 'Tài khoản',
  };

  if (path === '/account') {
    if (!user) return (
      <section className="section wrap">
        <Link className="btn primary" to="/login">Đăng nhập</Link>
      </section>
    );
    return (
      <section className="section">
        <div className="wrap">
          <div className="panel" style={{ maxWidth: 480 }}>
            <h1>Tài khoản</h1>
            <p style={{ marginTop: 16 }}>Xin chào, {user.name}.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              <Link className="btn primary" to="/my-trips">Chuyến của tôi</Link>
              <button type="button" className="btn secondary"
                onClick={() => { setUser(null); showToast('Đã đăng xuất'); navigate('/'); }}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      if (path === '/login') {
        const identity = fd.get('identity') as string;
        const password = fd.get('password') as string;
        if (!identity || !password) throw new Error('Vui lòng nhập tài khoản và mật khẩu');
        if (!validPhone(identity) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity))
          throw new Error('Vui lòng nhập số điện thoại hoặc email hợp lệ');
        const result = await demoApiService.login(identity, password);
        setUser(result);
        showToast('Đăng nhập thành công');
        navigate(destination);
      } else if (path === '/register') {
        const name = (fd.get('full_name') as string).trim();
        const phone = (fd.get('phone_number') as string).trim();
        const email = (fd.get('email') as string).trim();
        const password = fd.get('password') as string;
        const confirm = fd.get('confirm_password') as string;
        const terms = fd.get('terms');
        if (name.length < 2) throw new Error('Vui lòng nhập họ tên có ít nhất 2 ký tự');
        if (!validPhone(phone)) throw new Error('Số điện thoại phải có 10 chữ số và bắt đầu bằng 0');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email không hợp lệ');
        if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
          throw new Error('Mật khẩu cần ít nhất 8 ký tự, gồm chữ và số');
        if (password !== confirm) throw new Error('Mật khẩu nhập lại không khớp');
        if (!terms) throw new Error('Vui lòng đồng ý với điều khoản');
        await demoApiService.register();
        showToast('Đã gửi mã xác thực mô phỏng');
        navigate('/verify-account');
      } else if (path === '/forgot-password') {
        const identity = (fd.get('identity') as string).trim();
        if (!validPhone(identity) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity))
          throw new Error('Vui lòng nhập email hoặc số điện thoại hợp lệ');
        await demoApiService.register();
        showToast('Đã gửi hướng dẫn đặt lại mật khẩu mô phỏng');
        navigate('/reset-password');
      } else if (path === '/reset-password') {
        const p = fd.get('password') as string;
        if (p.length < 8 || !/[A-Za-z]/.test(p) || !/\d/.test(p))
          throw new Error('Mật khẩu cần ít nhất 8 ký tự, gồm chữ và số');
        if (p !== fd.get('confirm_password')) throw new Error('Mật khẩu nhập lại không khớp');
        await demoApiService.register();
        showToast('Đã cập nhật mật khẩu mô phỏng');
        navigate('/login');
      } else if (path === '/verify-account') {
        const otp = otpValues.join('');
        if (otp.length !== 6) throw new Error('Vui lòng nhập đủ 6 chữ số');
        await demoApiService.verifyOtp();
        if (otp !== '123456') throw new Error('Mã xác thực không đúng. Mã demo là 123456');
        showToast('Xác thực thành công. Vui lòng đăng nhập.');
        navigate('/login');
      }
    } catch (e: unknown) {
      setAuthError((e instanceof Error ? e.message : "Unexpected error. Please retry."));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setUser({ name: 'Khách hàng demo', phone: '0912345678' });
    showToast('Đã vào tài khoản demo');
    navigate(destination);
    setLoading(false);
  };

  return (
    <section className="section">
      <div className="wrap split">
        <div className="auth-art">
          <div>
            <span className="pill">Cung Đường / hành trình liên tỉnh</span>
            <h2 style={{ marginTop: 24 }}>Mỗi chuyến đi bắt đầu từ một lựa chọn dễ dàng.</h2>
          </div>
          <MapSVG />
        </div>

        <div className="panel">
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{titles[path]}</h1>
          <p className="muted" style={{ margin: '20px 0' }}>
            Mọi thông tin và thao tác xác thực ở đây đều là dữ liệu mẫu mô phỏng.
          </p>

          <form className="space" onSubmit={handleSubmit} noValidate>
            {path === '/login' && (
              <>
                <div>
                  <label className="label" htmlFor="identity">Số điện thoại hoặc email</label>
                  <input className="field" id="identity" name="identity" type="text" required />
                </div>
                <div>
                  <label className="label" htmlFor="password">Mật khẩu</label>
                  <input className="field" id="password" name="password" type="password" required />
                </div>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
                  <input type="checkbox" name="remember" /> Ghi nhớ trong phiên đang mở
                </label>
              </>
            )}
            {path === '/register' && (
              <>
                <div><label className="label" htmlFor="full_name">Họ và tên</label><input className="field" id="full_name" name="full_name" required /></div>
                <div><label className="label" htmlFor="phone_number">Số điện thoại</label><input className="field" id="phone_number" name="phone_number" type="tel" required /></div>
                <div><label className="label" htmlFor="email">Email</label><input className="field" id="email" name="email" type="email" required /></div>
                <div>
                  <label className="label" htmlFor="password">Mật khẩu</label>
                  <input className="field" id="password" name="password" type="password" required
                    onChange={e => setPwStrength(passwordStrength(e.target.value))} />
                  <p className="small" aria-live="polite" style={{ marginTop: 4 }}>Độ mạnh mật khẩu: {pwStrength || 'chưa nhập'}</p>
                </div>
                <div><label className="label" htmlFor="confirm_password">Nhập lại mật khẩu</label><input className="field" id="confirm_password" name="confirm_password" type="password" required /></div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14 }}>
                  <input type="checkbox" name="terms" required />
                  <span>Tôi đồng ý với <Link to="/policies#terms" className="success">điều khoản và chính sách</Link>.</span>
                </label>
              </>
            )}
            {path === '/forgot-password' && (
              <div><label className="label" htmlFor="identity">Email hoặc số điện thoại</label><input className="field" id="identity" name="identity" required /></div>
            )}
            {path === '/reset-password' && (
              <>
                <div>
                  <label className="label" htmlFor="password">Mật khẩu mới</label>
                  <input className="field" id="password" name="password" type="password" required
                    onChange={e => setPwStrength(passwordStrength(e.target.value))} />
                  <p className="small" aria-live="polite" style={{ marginTop: 4 }}>Độ mạnh mật khẩu: {pwStrength || 'chưa nhập'}</p>
                </div>
                <div><label className="label" htmlFor="confirm_password">Nhập lại mật khẩu</label><input className="field" id="confirm_password" name="confirm_password" type="password" required /></div>
              </>
            )}
            {path === '/verify-account' && (
              <>
                <p className="muted">Nhập mã sáu chữ số gửi qua kênh xác thực mô phỏng. Mã demo: <strong>123456</strong>.</p>
                <div className="otp-row">
                  {otpValues.map((v, i) => (
                    <input key={i} className="field otp" aria-label={`Chữ số mã xác thực ${i + 1}`}
                      inputMode="numeric" maxLength={1} value={v}
                      autoComplete={i === 0 ? 'one-time-code' : 'off'}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').slice(-1);
                        const next = [...otpValues];
                        next[i] = val;
                        setOtpValues(next);
                        if (val && i < 5) (document.querySelectorAll('.otp')[i + 1] as HTMLInputElement)?.focus();
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Backspace' && !v && i > 0)
                          (document.querySelectorAll('.otp')[i - 1] as HTMLInputElement)?.focus();
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {authError && <p className="error" role="alert">{authError}</p>}
            <button className="btn primary" type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Đang xử lý' : (
                { '/login': 'Đăng nhập', '/register': 'Tạo tài khoản', '/verify-account': 'Xác thực',
                  '/forgot-password': 'Gửi mã đặt lại', '/reset-password': 'Lưu mật khẩu mới' }[path]
              )}
            </button>
          </form>

          {path === '/login' && (
            <>
              <p className="small" style={{ marginTop: 20 }}>
                <Link to="/forgot-password" className="success">Quên mật khẩu?</Link>
                {' · '}
                <Link to="/register" className="success">Tạo tài khoản</Link>
              </p>
              <button type="button" className="btn ghost" style={{ marginTop: 16 }}
                onClick={handleDemoLogin} disabled={loading}>
                Vào nhanh bằng tài khoản demo
              </button>
              <p className="small muted">Tài khoản demo chỉ hoạt động trong phiên trang đang mở.</p>
            </>
          )}
          {path === '/register' && (
            <p className="small" style={{ marginTop: 20 }}>
              Đã có tài khoản? <Link to="/login" className="success">Đăng nhập</Link>
            </p>
          )}
          {path === '/forgot-password' && (
            <p style={{ marginTop: 20 }}>
              <Link className="btn ghost" to="/login">Quay lại đăng nhập</Link>
            </p>
          )}
          {path === '/verify-account' && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 16 }}>
              <button type="button" className="btn ghost" onClick={async () => {
                if (Date.now() < otpUntil) return;
                await new Promise(r => setTimeout(r, 500));
                setOtpUntil(Date.now() + 60000);
                showToast('Đã gửi lại mã mô phỏng: 123456');
              }}>Gửi lại mã</button>
              <p className="small muted">Bạn có thể dùng OTP hoặc email đăng ký; cả hai kênh đều được mô phỏng trong bản demo.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
