'use client';

import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { updateParticipantStatus, deleteParticipant } from '@/lib/actions/admin';
import { formatDate } from '@/lib/utils';
import type { Participant, ParticipantStatus } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  danza_ninos: 'Danza Niños',
  danza_general: 'Danza General',
};

const statusStyles: Record<string, 'warning' | 'success' | 'destructive'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'destructive',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  approved: 'Aprobado',
  rejected: 'Rechazado',
};

export function ParticipantsTableClient({ participants }: { participants: Participant[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'registration_number',
        header: 'N° Inscripción',
        cell: ({ row }: { row: { original: Participant } }) => (
          <span className="font-mono text-sm font-medium">{row.original.registration_number}</span>
        ),
      },
      {
        accessorKey: 'group_name',
        header: 'Grupo',
        cell: ({ row }: { row: { original: Participant } }) => (
          <span className="font-medium">{row.original.group_name}</span>
        ),
      },
      {
        accessorKey: 'representative_name',
        header: 'Representante',
      },
      {
        accessorKey: 'category',
        header: 'Categoría',
        cell: ({ row }: { row: { original: Participant } }) => (
          <Badge variant="outline">{categoryLabels[row.original.category]}</Badge>
        ),
      },
      {
        accessorKey: 'participants_count',
        header: 'Participantes',
      },
      {
        accessorKey: 'has_float',
        header: 'Carro',
        cell: ({ row }: { row: { original: Participant } }) => (
          row.original.has_float ? <Badge variant="success">Sí</Badge> : <Badge variant="secondary">No</Badge>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }: { row: { original: Participant } }) => (
          <Badge variant={statusStyles[row.original.status]}>
            {statusLabels[row.original.status]}
          </Badge>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Fecha',
        cell: ({ row }: { row: { original: Participant } }) => (
          <span className="text-sm text-gray-500">{formatDate(row.original.created_at)}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: participants,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleViewDetail = (participant: Participant) => {
    setSelectedParticipant(participant);
    setDetailOpen(true);
  };

  const handleStatusChange = async (id: string, status: ParticipantStatus) => {
    await updateParticipantStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Eliminar inscripción?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      await deleteParticipant(id);
      Swal.fire({
        title: 'Eliminado',
        text: 'La inscripción ha sido eliminada correctamente.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const exportToCSV = () => {
    const headers = [
      'N° Inscripción', 'Grupo', 'Representante', 'Teléfono', 'Email',
      'Categoría', 'Participantes', 'Música', 'Carro Alegórico',
      'Observaciones', 'Estado', 'Fecha de registro',
    ];

    const rows = participants.map(p => [
      p.registration_number,
      p.group_name,
      p.representative_name,
      p.phone,
      p.email ?? '',
      categoryLabels[p.category] ?? p.category,
      p.participants_count.toString(),
      p.music_name,
      p.has_float ? 'Sí' : 'No',
      p.observations ?? '',
      statusLabels[p.status] ?? p.status,
      formatDate(p.created_at),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `participantes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = async () => {
    const XLSX = await import('xlsx');
    const data = participants.map(p => ({
      'N° Inscripción': p.registration_number,
      Grupo: p.group_name,
      Representante: p.representative_name,
      Teléfono: p.phone,
      Email: p.email ?? '',
      Categoría: categoryLabels[p.category] ?? p.category,
      'N° Participantes': p.participants_count,
      Música: p.music_name,
      'Carro Alegórico': p.has_float ? 'Sí' : 'No',
      Observaciones: p.observations ?? '',
      Estado: statusLabels[p.status] ?? p.status,
      'Fecha de registro': formatDate(p.created_at),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Participantes');
    XLSX.writeFile(wb, `participantes-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-4">
      {/* Filters and actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por grupo, representante, N° inscripción..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={(table.getColumn('category')?.getFilterValue() as string) ?? ''}
            onValueChange={(value) =>
              table.getColumn('category')?.setFilterValue(value || undefined)
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">Todas</SelectItem>
              <SelectItem value="danza_ninos">Danza Niños</SelectItem>
              <SelectItem value="danza_general">Danza General</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={(table.getColumn('status')?.getFilterValue() as string) ?? ''}
            onValueChange={(value) =>
              table.getColumn('status')?.setFilterValue(value || undefined)
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">Todos</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="approved">Aprobado</SelectItem>
              <SelectItem value="rejected">Rechazado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <FileText className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportToExcel}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        className="flex items-center gap-1 hover:text-gray-900"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    )}
                  </TableHead>
                ))}
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewDetail(row.original)}
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {row.original.status !== 'approved' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600 hover:text-green-700"
                          onClick={() => handleStatusChange(row.original.id, 'approved')}
                          title="Aprobar"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                      {row.original.status !== 'rejected' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 "
                          onClick={() => handleStatusChange(row.original.id, 'rejected')}
                          title="Rechazar"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-600"
                        onClick={() => handleDelete(row.original.id)}
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center text-gray-500">
                  No se encontraron participantes
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()} ({table.getFilteredRowModel().rows.length} registros)
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalle de Inscripción</DialogTitle>
            <DialogDescription>
              Información completa del participante
            </DialogDescription>
          </DialogHeader>
          {selectedParticipant && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">N° Inscripción</p>
                  <p className="font-mono font-medium">{selectedParticipant.registration_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <Badge variant={statusStyles[selectedParticipant.status]}>
                    {statusLabels[selectedParticipant.status]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grupo</p>
                  <p className="font-medium">{selectedParticipant.group_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Representante</p>
                  <p className="font-medium">{selectedParticipant.representative_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p>{selectedParticipant.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedParticipant.email ?? '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categoría</p>
                  <p>{categoryLabels[selectedParticipant.category]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participantes</p>
                  <p>{selectedParticipant.participants_count}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Música</p>
                  <p>{selectedParticipant.music_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carro Alegórico</p>
                  <p>{selectedParticipant.has_float ? 'Sí' : 'No'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Observaciones</p>
                  <p>{selectedParticipant.observations ?? '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Fecha de registro</p>
                  <p>{formatDate(selectedParticipant.created_at)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
