// src/lib/api.ts
// Central API client — all requests go through here

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
// const BASE_URL = `${API_BASE}/api`;

// ─── Token helpers ───────────────────────────────────────────
export const getAccessToken  = () => typeof window !== 'undefined' ? localStorage.getItem('access_token')  : null
export const getRefreshToken = () => typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null

export const saveTokens = (access: string, refresh: string) => {
  localStorage.setItem('access_token',  access)
  localStorage.setItem('refresh_token', refresh)
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
}

export const saveUser = (user: any) => localStorage.setItem('user', JSON.stringify(user))
export const getUser  = () => {
  if (typeof window === 'undefined') return null
  const u = localStorage.getItem('user')
  return u ? JSON.parse(u) : null
}

// ─── Core fetch wrapper ──────────────────────────────────────
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  withAuth = true,
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string> || {}),
  }

  if (withAuth) {
    const token = getAccessToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })

  // Auto-refresh on 401
  if (res.status === 401 && withAuth) {
    const refresh = getRefreshToken()
    if (refresh) {
      const refreshRes = await fetch(`${BASE_URL}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      })
      if (refreshRes.ok) {
        const data = await refreshRes.json()
        saveTokens(data.access, refresh)
        headers['Authorization'] = `Bearer ${data.access}`
        const retryRes = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
        if (!retryRes.ok) throw await retryRes.json()
        return retryRes.json()
      } else {
        clearTokens()
        window.location.href = '/client/register'
      }
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw error
  }

  if (res.status === 204) return {} as T
  return res.json()
}

// ─── HTTP methods ─────────────────────────────────────────────
export const api = {
  get:    <T>(url: string, auth = true)              => request<T>(url, { method: 'GET' }, auth),
  post:   <T>(url: string, body: any, auth = true)   => request<T>(url, { method: 'POST',  body: body instanceof FormData ? body : JSON.stringify(body) }, auth),
  patch:  <T>(url: string, body: any, auth = true)   => request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }, auth),
  delete: <T>(url: string, auth = true)              => request<T>(url, { method: 'DELETE' }, auth),
}

// ─── Auth ─────────────────────────────────────────────────────
export const authAPI = {
  register: (data: any)          => api.post('/auth/register/', data, false),
  login:    (email: string, password: string) => api.post('/auth/login/', { email, password }, false),
  logout:   (refresh: string)    => api.post('/auth/logout/', { refresh }),
  requestOTP: (email: string)    => api.post('/auth/otp/request/', { email }, false),
  verifyOTP:  (email: string, code: string) => api.post('/auth/otp/verify/', { email, code }, false),
  profile:    ()                 => api.get('/auth/profile/'),
  updateProfile: (data: any)     => api.patch('/auth/profile/', data),
}

// ─── Candidates ───────────────────────────────────────────────
export const candidatesAPI = {
  apply:      (formData: FormData) => api.post('/candidates/apply/', formData, false),
  browse:     (params?: string)    => api.get(`/candidates/browse/${params ? '?' + params : ''}`),
  detail:     (id: number)         => api.get(`/candidates/${id}/`),
  myApplication: ()                => api.get('/candidates/my-application/'),
}

// ─── Hiring ───────────────────────────────────────────────────
export const hiringAPI = {
  createRequest:    (data: any)                          => api.post('/hiring/requests/', data),
  getRequests:      ()                                   => api.get('/hiring/requests/'),
  shortlist:        (hrId: number, candidateId: number)  => api.post(`/hiring/requests/${hrId}/shortlist/`, { candidate: candidateId }),
  removeShortlist:  (hrId: number, candidateId: number)  => api.delete(`/hiring/requests/${hrId}/shortlist/${candidateId}/`),
  requestInterview: (hrId: number, candidateId: number)  => api.post(`/hiring/requests/${hrId}/interview/`, { candidate: candidateId }),
  confirmHire:      (hrId: number, candidateId: number)  => api.post(`/hiring/requests/${hrId}/confirm/`, { candidate_id: candidateId }),
  myEmployees:      ()                                   => api.get('/hiring/employees/'),
}

// ─── Billing ──────────────────────────────────────────────────
export const billingAPI = {
  invoices:            () => api.get('/billing/invoices/'),
  payments:            () => api.get('/billing/payments/'),
  createPaymentIntent: (amount: number, type: string) => api.post('/billing/create-payment-intent/', { amount, payment_type: type }),
}

// ─── Contracts ────────────────────────────────────────────────
export const contractsAPI = {
  sign:  (formData: FormData) => api.post('/contracts/sign/', formData),
  mine:  ()                   => api.get('/contracts/mine/'),
}

// ─── Support ──────────────────────────────────────────────────
export const supportAPI = {
  tickets:      ()                                    => api.get('/support/tickets/'),
  createTicket: (data: any)                           => api.post('/support/tickets/', data),
  ticketDetail: (id: number)                          => api.get(`/support/tickets/${id}/`),
  reply:        (id: number, message: string)         => api.post(`/support/tickets/${id}/`, { message }),
}

// ─── Admin ────────────────────────────────────────────────────
export const adminAPI = {
  // Candidates
  allCandidates:    (params?: string) => api.get(`/candidates/browse/?${params || ''}`),
  // Clients
  allClients:       ()  => api.get('/auth/admin/clients/'),
  // Hiring
  allHiringRequests: () => api.get('/hiring/admin/requests/'),
  allEmployees:     ()  => api.get('/hiring/admin/employees/'),
  // Billing
  allInvoices:      ()  => api.get('/billing/admin/invoices/'),
  allPayments:      ()  => api.get('/billing/admin/payments/'),
  // Support
  allTickets:       ()  => api.get('/support/admin/tickets/'),
}