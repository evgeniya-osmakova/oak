import { makeAutoObservable } from 'mobx';
import type { Company, CompanyUpdateData, Contact, ContactUpdateData, Photo } from '../api/types';
import { api } from '../api/api';

class CompanyStore {
  company: Company | null = null;
  contact: Contact | null = null;
  uploadedPhotos: Photo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get allPhotos(): Photo[] {
    return this.company ? [...this.company.photos, ...this.uploadedPhotos] : [];
  }

  addUploadedPhoto = (photo: Photo) => {
    this.uploadedPhotos.push(photo);
  };

  async fetchCompanyData(companyId: string, contactId: string): Promise<void> {
    const [company, contact] = await Promise.all([
      api.getCompany(companyId),
      api.getContact(contactId),
    ]);

    this.setCompany(company);
    this.setContact(contact);
  }

  async updateCompany(data: CompanyUpdateData): Promise<void> {
    if (!this.company) {
      return;
    }

    const updatedCompany = await api.updateCompany(this.company.id, data);
    this.setCompany(updatedCompany);
  }

  async updateContact(data: ContactUpdateData): Promise<void> {
    if (!this.contact) {
      return;
    }

    const updatedContact = await api.updateContact(this.contact.id, data);
    this.setContact(updatedContact);
  }

  async uploadImage(file: File): Promise<void> {
    if (!this.company) {
      return;
    }

    const photo = await api.uploadCompanyImage(this.company.id, file);
    this.addUploadedPhoto(photo);
  }

  async deleteImage(imageName: string): Promise<void> {
    if (!this.company) {
      return;
    }

    await api.deleteCompanyImage(this.company.id, imageName);

    if (this.company) {
      const photos = this.company.photos.filter(photo => photo.name !== imageName);
      this.setCompany({
        ...this.company,
        photos,
      })
    }

    this.setPhotos(this.uploadedPhotos.filter(photo => photo.name !== imageName));
  }

  async deleteCompany(): Promise<void> {
    if (!this.company) {
      return;
    }

    await api.deleteCompany(this.company.id);
    this.setCompany(null);
    this.uploadedPhotos = [];
  }

  setCompany(company: Company | null) {
    this.company = company;
  }

  setContact(contact: Contact | null) {
    this.contact = contact;
  }

  setPhotos(photos: Photo[]) {
    this.uploadedPhotos = photos;
  }
}

export const companyStore = new CompanyStore();
