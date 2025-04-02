import { makeAutoObservable } from 'mobx';
import type { Company, CompanyUpdateData, Contact, ContactUpdateData, Photo } from '../api/types';
import { api } from '../api/api';

class CompanyStore {
  company: Company | null = null;
  contact: Contact | null = null;
  loading = false;
  error: string | null = null;
  uploadedPhotos: Photo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get hasError(): boolean {
    return this.error !== null;
  }

  get allPhotos(): Photo[] {
    return this.company ? [...this.company.photos, ...this.uploadedPhotos] : [];
  }

  addUploadedPhoto = (photo: Photo) => {
    this.uploadedPhotos.push(photo);
  };

  async fetchCompanyData(companyId: string, contactId: string): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      const [company, contact] = await Promise.all([
        api.getCompany(companyId),
        api.getContact(contactId),
      ]);
      this.setCompany(company);
      this.contact = contact;
      this.uploadedPhotos = [];
    } catch (error) {
      this.setError('Failed to fetch company data');
      console.error('Error fetching company data:', error);
    } finally {
      this.setLoading(false);
    }
  }

  async updateCompany(data: CompanyUpdateData): Promise<void> {
    if (!this.company) {
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      const updatedCompany = await api.updateCompany(this.company.id, data);
      this.setCompany(updatedCompany);
    } catch (error) {
      this.setError('Failed to update company');
      console.error('Error updating company:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async updateContact(data: ContactUpdateData): Promise<void> {
    if (!this.contact) {
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      const updatedContact = await api.updateContact(this.contact.id, data);
      this.contact = updatedContact;
    } catch (error) {
      this.setError('Failed to update contact');
      console.error('Error updating contact:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async uploadImage(file: File): Promise<void> {
    if (!this.company) {
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      const photo = await api.uploadCompanyImage(this.company.id, file);
      this.addUploadedPhoto(photo);
    } catch (error) {
      this.setError('Failed to upload image');
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async deleteImage(imageName: string): Promise<void> {
    if (!this.company) {
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      await api.deleteCompanyImage(this.company.id, imageName);
      if (this.company) {
        this.company.photos = this.company.photos.filter(photo => photo.name !== imageName);
      }
      this.uploadedPhotos = this.uploadedPhotos.filter(photo => photo.name !== imageName);
    } catch (error) {
      this.setError('Failed to delete image');
      console.error('Error deleting image:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async deleteCompany(): Promise<void> {
    if (!this.company) {
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      await api.deleteCompany(this.company.id);
      this.setCompany(null);
      this.uploadedPhotos = [];
    } catch (error) {
      this.setError('Failed to delete company');
      console.error('Error deleting company:', error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setCompany(company: Company | null) {
    this.company = company;
  }
}

export const companyStore = new CompanyStore();
