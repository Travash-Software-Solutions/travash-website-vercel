'use client'

import { useState, useId, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'

export interface CountryCode {
  code: string
  dial: string
  flag: string
  name: string
  maxDigits: number
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India', maxDigits: 10 },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States', maxDigits: 10 },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom', maxDigits: 10 },
  { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'United Arab Emirates', maxDigits: 9 },
  { code: 'SA', dial: '+966', flag: '🇸🇦', name: 'Saudi Arabia', maxDigits: 9 },
  { code: 'QA', dial: '+974', flag: '🇶🇦', name: 'Qatar', maxDigits: 8 },
  { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore', maxDigits: 8 },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia', maxDigits: 9 },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada', maxDigits: 10 },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany', maxDigits: 11 },
  { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'France', maxDigits: 9 },
  { code: 'KW', dial: '+965', flag: '🇰🇼', name: 'Kuwait', maxDigits: 8 },
  { code: 'OM', dial: '+968', flag: '🇴🇲', name: 'Oman', maxDigits: 8 },
  { code: 'BH', dial: '+973', flag: '🇧🇭', name: 'Bahrain', maxDigits: 8 },
  { code: 'MY', dial: '+60', flag: '🇲🇾', name: 'Malaysia', maxDigits: 9 },
  { code: 'NP', dial: '+977', flag: '🇳🇵', name: 'Nepal', maxDigits: 10 },
  { code: 'LK', dial: '+94', flag: '🇱🇰', name: 'Sri Lanka', maxDigits: 9 },
  { code: 'BD', dial: '+880', flag: '🇧🇩', name: 'Bangladesh', maxDigits: 10 },
  { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'South Africa', maxDigits: 9 },
  { code: 'NZ', dial: '+64', flag: '🇳🇿', name: 'New Zealand', maxDigits: 9 },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan', maxDigits: 10 },
]

interface CountryPhoneInputProps {
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  className?: string
  inputClassName?: string
  defaultValue?: string
  onChange?: (fullPhone: string) => void
}

export default function CountryPhoneInput({
  id,
  name = 'phone',
  placeholder = '98765 43210',
  required = false,
  className = '',
  inputClassName = '',
  defaultValue = '',
  onChange,
}: CountryPhoneInputProps) {
  const generatedId = useId()
  const inputId = id || generatedId

  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES[0])
  const [phoneNumber, setPhoneNumber] = useState<string>(defaultValue)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fullPhoneNumber = phoneNumber.trim()
    ? `${selectedCountry.dial} ${phoneNumber.trim()}`
    : ''

  // Close dropdown when user clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePhoneChange = (val: string) => {
    // Allow digits only
    const digitsOnly = val.replace(/\D/g, '')
    // Enforce max digit limit for selected country
    const trimmed = digitsOnly.slice(0, selectedCountry.maxDigits)
    setPhoneNumber(trimmed)
    // Validate length
    if (trimmed.length > 0 && trimmed.length < selectedCountry.maxDigits) {
      setPhoneError(`${selectedCountry.name} phone numbers must be exactly ${selectedCountry.maxDigits} digits.`)
    } else {
      setPhoneError('')
    }
    const combined = trimmed ? `${selectedCountry.dial} ${trimmed}` : ''
    if (onChange) onChange(combined)
  }

  const handleCountrySelect = (c: CountryCode) => {
    setSelectedCountry(c)
    setIsOpen(false)
    setSearch('')
    // Re-validate current number with new country
    const trimmed = phoneNumber.slice(0, c.maxDigits)
    setPhoneNumber(trimmed)
    setPhoneError('')
    const combined = trimmed ? `${c.dial} ${trimmed}` : ''
    if (onChange) onChange(combined)
  }

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={dropdownRef} className={`relative flex flex-col w-full min-w-0 ${className}`}>
      {/* Hidden input for native HTML form submission (FormData) */}
      <input type="hidden" name={name} value={fullPhoneNumber} />

      <div className="relative flex items-center w-full">
      {/* Country Code Trigger Button (Compact Flag + Code + Arrow) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select Country Code"
        className="h-full flex-shrink-0 flex items-center justify-between gap-1.5 bg-white border border-gray-200 border-r-0 rounded-l-xl px-3 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#004771]/20 cursor-pointer min-w-[88px] max-w-[104px] transition-all select-none"
      >
        <span className="text-xs sm:text-sm font-bold text-[#0B1E3D] flex items-center gap-1.5 truncate">
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span>{selectedCountry.dial}</span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Searchable Country Popover List */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-64 max-h-64 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden flex flex-col p-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="relative mb-1.5">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#004771] focus:bg-white"
            />
          </div>

          <div className="overflow-y-auto max-h-48 space-y-0.5 pr-0.5 custom-scrollbar">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-colors text-left ${
                    c.code === selectedCountry.code
                      ? 'bg-[#EEF4FB] text-[#004771] font-bold'
                      : 'hover:bg-gray-50 text-gray-700 font-medium'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate pr-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  <span className="text-gray-400 font-mono font-semibold flex-shrink-0">{c.dial}</span>
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-xs text-gray-400">No country found</div>
            )}
          </div>
        </div>
      )}

      {/* Phone Number Input Field */}
      <input
        id={inputId}
        type="tel"
        required={required}
        value={phoneNumber}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder={placeholder}
        maxLength={selectedCountry.maxDigits}
        inputMode="numeric"
        pattern={`[0-9]{${selectedCountry.maxDigits}}`}
        title={`Enter exactly ${selectedCountry.maxDigits} digits`}
        className={`flex-1 min-w-0 w-full bg-white border border-gray-200 rounded-r-xl px-3 py-2.5 text-xs sm:text-sm text-[#0B1E3D] placeholder:text-gray-400 focus:outline-none focus:border-[#004771] focus:ring-2 focus:ring-[#E0F2FE] transition-all shadow-2xs ${inputClassName}`}
      />
      </div>
      {/* Inline validation error */}
      {phoneError && (
        <p className="text-[10px] text-red-500 font-medium mt-0.5 ml-0.5">{phoneError}</p>
      )}
    </div>
  )
}

