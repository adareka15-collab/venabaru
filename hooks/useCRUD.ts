
import { useState } from 'react';
import { dbOperations } from '../lib/api';
import { useSupabaseData } from './useSupabase';

export const useCRUD = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refetch } = useSupabaseData();

  const handleOperation = async (operation: () => Promise<any>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      await refetch(); // Refresh data after operation
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // Generic CRUD operations
    create: (table: string, data: any) => handleOperation(() => dbOperations.create(table, data)),
    read: (table: string, filters?: any) => handleOperation(() => dbOperations.read(table, filters)),
    update: (table: string, id: string, data: any) => handleOperation(() => dbOperations.update(table, id, data)),
    delete: (table: string, id: string) => handleOperation(() => dbOperations.delete(table, id)),
    
    // Specific operations
    createClient: (data: any) => handleOperation(() => dbOperations.createClient(data)),
    updateClient: (id: string, data: any) => handleOperation(() => dbOperations.updateClient(id, data)),
    deleteClient: (id: string) => handleOperation(() => dbOperations.delete('clients', id)),
    
    createProject: (data: any) => handleOperation(() => dbOperations.createProject(data)),
    updateProject: (id: string, data: any) => handleOperation(() => dbOperations.updateProject(id, data)),
    deleteProject: (id: string) => handleOperation(() => dbOperations.delete('projects', id)),
    
    createTeamMember: (data: any) => handleOperation(() => dbOperations.createTeamMember(data)),
    updateTeamMember: (id: string, data: any) => handleOperation(() => dbOperations.updateTeamMember(id, data)),
    deleteTeamMember: (id: string) => handleOperation(() => dbOperations.delete('team_members', id)),
    
    createTransaction: (data: any) => handleOperation(() => dbOperations.createTransaction(data)),
    updateTransaction: (id: string, data: any) => handleOperation(() => dbOperations.updateTransaction(id, data)),
    deleteTransaction: (id: string) => handleOperation(() => dbOperations.delete('transactions', id)),
    
    createPackage: (data: any) => handleOperation(() => dbOperations.createPackage(data)),
    updatePackage: (id: string, data: any) => handleOperation(() => dbOperations.updatePackage(id, data)),
    deletePackage: (id: string) => handleOperation(() => dbOperations.delete('packages', id)),
    
    createAddOn: (data: any) => handleOperation(() => dbOperations.createAddOn(data)),
    updateAddOn: (id: string, data: any) => handleOperation(() => dbOperations.updateAddOn(id, data)),
    deleteAddOn: (id: string) => handleOperation(() => dbOperations.delete('add_ons', id)),
    
    createLead: (data: any) => handleOperation(() => dbOperations.createLead(data)),
    updateLead: (id: string, data: any) => handleOperation(() => dbOperations.updateLead(id, data)),
    deleteLead: (id: string) => handleOperation(() => dbOperations.delete('leads', id)),
    
    createAsset: (data: any) => handleOperation(() => dbOperations.createAsset(data)),
    updateAsset: (id: string, data: any) => handleOperation(() => dbOperations.updateAsset(id, data)),
    deleteAsset: (id: string) => handleOperation(() => dbOperations.delete('assets', id)),
    
    createSOP: (data: any) => handleOperation(() => dbOperations.createSOP(data)),
    updateSOP: (id: string, data: any) => handleOperation(() => dbOperations.updateSOP(id, data)),
    deleteSOP: (id: string) => handleOperation(() => dbOperations.delete('sops', id)),
    
    updateProfile: (id: string, data: any) => handleOperation(() => dbOperations.updateProfile(id, data)),
  };
};
