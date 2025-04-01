import { makeObservable, observable, computed, action } from 'mobx';
import type { Company, CompanyUpdateData, Contact, ContactUpdateData, Photo } from '../api/types';
import { api } from '../api/api';

class CompanyStore {
  company: Company | null = null;
  contact: Contact | null = null;
  loading = false;
  error: string | null = null;
  uploadedPhotos: Photo[] = [];

  constructor() {
    makeObservable(this, {
      company: observable,
      contact: observable,
      loading: observable,
      error: observable,
      uploadedPhotos: observable,
      hasError: computed,
      fetchCompanyData: action,
      updateCompany: action,
      updateContact: action,
      uploadImage: action,
      deleteImage: action,
      deleteCompany: action,
      addUploadedPhoto: action
    });
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
    this.loading = true;
    this.error = null;

    try {
      const [company, contact] = await Promise.all([
        api.getCompany(companyId),
        api.getContact(contactId),
      ]);
      this.company = company;
      this.contact = contact;
      this.uploadedPhotos = [];
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  async updateCompany(data: CompanyUpdateData): Promise<void> {
    if (!this.company) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const updatedCompany = await api.updateCompany(this.company.id, data);
      this.company = updatedCompany;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  async updateContact(data: ContactUpdateData): Promise<void> {
    if (!this.contact) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const updatedContact = await api.updateContact(this.contact.id, data);
      this.contact = updatedContact;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  async uploadImage(file: File): Promise<void> {
    if (!this.company) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const photo = await api.uploadCompanyImage(this.company.id, file);
      this.addUploadedPhoto(photo);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  async deleteImage(imageName: string): Promise<void> {
    if (!this.company) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await api.deleteCompanyImage(this.company.id, imageName);
      if (this.company) {
        this.company.photos = this.company.photos.filter(photo => photo.name !== imageName);
      }
      this.uploadedPhotos = this.uploadedPhotos.filter(photo => photo.name !== imageName);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  async deleteCompany(): Promise<void> {
    if (!this.company) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await api.deleteCompany(this.company.id);
      this.company = null;
      this.uploadedPhotos = [];
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      this.loading = false;
    }
  }
}

export const companyStore = new CompanyStore();
