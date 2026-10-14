import { Eye, EyeOff } from 'lucide-react'
import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  name: string
  trailing?: ReactNode
  registration?: UseFormRegisterReturn
}

export function Field({ label, error, hint, name, trailing, registration, ...inputProps }: FieldProps) {
  const errorId = `${name}-error`
  const hintId = `${name}-hint`
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <div className={`input-wrap${error ? ' has-error' : ''}`}>
        <input id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : hint ? hintId : undefined} {...inputProps} {...registration} />
        {trailing}
      </div>
      {hint && !error && <p className="field-hint" id={hintId}>{hint}</p>}
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  )
}

interface PasswordFieldProps extends Omit<FieldProps, 'type' | 'trailing'> {}

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  return (
    <Field
      {...props}
      type={visible ? 'text' : 'password'}
      trailing={
        <button className="visibility-toggle" type="button" aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setVisible(!visible)}>
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  )
}

export function ProviderButtons({ onUnavailable }: { onUnavailable: () => void }) {
  return (
    <div className="provider-buttons">
      <button className="provider-button" type="button" onClick={onUnavailable}>
        <GoogleMark /> <span>Tiếp tục với Google</span>
      </button>
      <button className="provider-button" type="button" onClick={onUnavailable}>
        <span className="facebook-mark" aria-hidden="true">f</span> <span>Tiếp tục với Facebook</span>
      </button>
    </div>
  )
}

function GoogleMark() {
  return <svg className="google-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.3 2.9-7.4Z"/><path fill="#34A853" d="M12 22c2.7 0 5-1 6.7-2.4l-3.3-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6Z"/><path fill="#EA4335" d="M12 6c1.5 0 2.9.5 3.9 1.5l2.9-2.9A9.6 9.6 0 0 0 12 2a10 10 0 0 0-9 5.5l3.4 2.6C7.2 7.8 9.4 6 12 6Z"/></svg>
}

export function FormMessage({ children, tone = 'error' }: { children: ReactNode; tone?: 'error' | 'success' | 'info' }) {
  return <div className={`form-message ${tone}`} role="status">{children}</div>
}
