import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Calendar, User, CheckCircle2, XCircle, Clock, Circle, AlertCircle, Play } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const TaskDetailDialog = ({ task, isOpen, onClose, onUpdate, projectMembers, isAdmin }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  if (!task) return null;

  const isAssignedToMe = task.assignedTo?._id === user?.id || task.assignedTo === user?.id;

  const getStatusConfig = (status) => {
    switch (status) {
      case 'todo':
        return { 
          label: 'Yapılacak', 
          color: 'bg-gray-100 text-gray-700 border-gray-300',
          icon: <Circle className="h-4 w-4" />
        };
      case 'in-progress':
        return { 
          label: 'Devam Ediyor', 
          color: 'bg-amber-100 text-amber-700 border-amber-300',
          icon: <Clock className="h-4 w-4" />
        };
      case 'completed':
        return { 
          label: 'Tamamlandı', 
          color: 'bg-blue-100 text-blue-700 border-blue-300',
          icon: <CheckCircle2 className="h-4 w-4" />
        };
      case 'approved':
        return { 
          label: 'Onaylandı', 
          color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
          icon: <CheckCircle2 className="h-4 w-4" />
        };
      case 'rejected':
        return { 
          label: 'Reddedildi', 
          color: 'bg-red-100 text-red-700 border-red-300',
          icon: <XCircle className="h-4 w-4" />
        };
      default:
        return { 
          label: status, 
          color: 'bg-gray-100 text-gray-700',
          icon: <Circle className="h-4 w-4" />
        };
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { label: 'Yüksek', color: 'bg-red-100 text-red-700 border-red-300' };
      case 'medium':
        return { label: 'Orta', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' };
      case 'low':
        return { label: 'Düşük', color: 'bg-green-100 text-green-700 border-green-300' };
      default:
        return { label: priority || 'Orta', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const handleStartTask = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/tasks/${task._id}/start`);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'Görev başlatılamadı');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/tasks/${task._id}/complete`);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'Görev tamamlanamadı');
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalAction = async () => {
    if (actionType === 'reject' && !approvalNotes.trim()) {
      alert('Lütfen red sebebini belirtin');
      return;
    }

    setLoading(true);
    try {
      const endpoint = actionType === 'approve' ? 'approve' : 'reject';
      const response = await api.patch(`/tasks/${task._id}/${endpoint}`, {
        notes: approvalNotes
      });
      onUpdate(response.data);
      setShowApprovalDialog(false);
      setApprovalNotes('');
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'İşlem başarısız');
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = getStatusConfig(task.status);
  const priorityConfig = getPriorityConfig(task.priority);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold pr-8">{task.title}</DialogTitle>
            <DialogDescription className="sr-only">Görev detayları</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status and Priority */}
            <div className="flex gap-3 flex-wrap">
              <Badge className={`${statusConfig.color} border px-3 py-1 font-semibold flex items-center gap-1.5`}>
                {statusConfig.icon}
                {statusConfig.label}
              </Badge>
              <Badge className={`${priorityConfig.color} border px-3 py-1 font-semibold flex items-center gap-1.5`}>
                <AlertCircle className="h-4 w-4" />
                {priorityConfig.label}
              </Badge>
            </div>

            {/* Description */}
            {task.description && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Açıklama</h3>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  {task.description}
                </p>
              </div>
            )}

            {/* Task Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.assignedTo && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Atanan Kişi</p>
                    <p className="text-sm font-medium">{task.assignedTo.username}</p>
                  </div>
                </div>
              )}

              {task.dueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Son Tarih</p>
                    <p className="text-sm font-medium">
                      {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Approval/Rejection Notes */}
            {task.approvalNotes && (
              <div className={`p-4 rounded-lg border-2 ${
                task.status === 'approved' 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  {task.status === 'approved' ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Onay Notu
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-600" />
                      Red Sebebi
                    </>
                  )}
                </h3>
                <p className="text-sm">{task.approvalNotes}</p>
                {task.approvedBy && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {task.approvedBy.username} - {new Date(task.approvedAt).toLocaleString('tr-TR')}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t flex-wrap">
              {/* Assigned User Actions */}
              {isAssignedToMe && task.status === 'todo' && (
                <Button
                  onClick={handleStartTask}
                  disabled={loading}
                  className="gap-2 bg-gradient-to-r from-gray-900 to-gray-800"
                >
                  <Play className="h-4 w-4" />
                  Göreve Başla
                </Button>
              )}

              {isAssignedToMe && task.status === 'in-progress' && (
                <Button
                  onClick={handleCompleteTask}
                  disabled={loading}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Tamamlandı Olarak İşaretle
                </Button>
              )}

              {/* Admin Actions */}
              {isAdmin && task.status === 'completed' && (
                <>
                  <Button
                    onClick={() => {
                      setActionType('approve');
                      setShowApprovalDialog(true);
                    }}
                    disabled={loading}
                    className="gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Onayla
                  </Button>
                  <Button
                    onClick={() => {
                      setActionType('reject');
                      setShowApprovalDialog(true);
                    }}
                    disabled={loading}
                    variant="destructive"
                    className="gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Reddet
                  </Button>
                </>
              )}

              <Button
                onClick={onClose}
                variant="outline"
                disabled={loading}
              >
                Kapat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval/Rejection Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Görevi Onayla' : 'Görevi Reddet'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'Görevi onaylamak için isteğe bağlı bir not ekleyebilirsiniz.'
                : 'Lütfen red sebebini belirtin.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="notes">
                {actionType === 'approve' ? 'Onay Notu (İsteğe bağlı)' : 'Red Sebebi *'}
              </Label>
              <Textarea
                id="notes"
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder={actionType === 'approve' 
                  ? 'Harika iş! Teşekkürler.'
                  : 'Lütfen XYZ kısmını düzeltin...'}
                rows={4}
                className="mt-1.5"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowApprovalDialog(false);
                  setApprovalNotes('');
                }}
                disabled={loading}
              >
                İptal
              </Button>
              <Button
                onClick={handleApprovalAction}
                disabled={loading}
                className={actionType === 'approve' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700'
                  : ''}
                variant={actionType === 'reject' ? 'destructive' : 'default'}
              >
                {loading ? 'İşleniyor...' : actionType === 'approve' ? 'Onayla' : 'Reddet'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskDetailDialog;
