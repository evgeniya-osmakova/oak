import { Company, Contact, CompanyUpdateData, ContactUpdateData, Photo } from './types';

const BASE_URL = 'https://test-task-api.allfuneral.com';

class Api {
  private token: string | null = null;

  private get headers(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...(this.token ? { 'Authorization': this.token } : {})
    };
  }

  async auth(username: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth?user=${username}`);
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const token = response.headers.get('Authorization');
    if (!token) {
      throw new Error('No authorization token received');
    }

    this.token = token;
  }

  async getCompany(id: string): Promise<Company> {
    const response = await fetch(`${BASE_URL}/companies/${id}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch company');
    }

    return response.json();
  }

  async updateCompany(id: string, data: CompanyUpdateData): Promise<Company> {
    const response = await fetch(`${BASE_URL}/companies/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update company');
    }

    return response.json();
  }

  async deleteCompany(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/companies/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to delete company');
    }
  }

  async uploadCompanyImage(id: string, file: File): Promise<Photo> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/companies/${id}/image`, {
      method: 'POST',
      headers: {
        'Authorization': this.token || '',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  }

  async deleteCompanyImage(id: string, imageName: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/companies/${id}/image/${imageName}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }
  }

  async getContact(id: string): Promise<Contact> {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contact');
    }

    return response.json();
  }

  async updateContact(contactId: string, data: ContactUpdateData): Promise<Contact> {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        lastname: data.lastname,
        firstname: data.firstname,
        phone: data.phone,
        email: data.email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update contact');
    }

    return response.json();
  }
}

export const api = new Api(); 