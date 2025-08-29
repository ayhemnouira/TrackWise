import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Checkbox,
  Button,
  Chip,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon,
  Clear as ClearIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { categoryColors } from "../data/categories";

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS: Record<string, string> = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  date: string; // ISO string or parseable by Date
  amount: number;
  category: string;
  description?: string;
  type: TransactionType;
  isRecurring?: boolean;
  recurringInterval?: keyof typeof RECURRING_INTERVALS;
  nextRecurringDate?: string;
}

type SortField = "date" | "amount" | "category";
type SortDirection = "asc" | "desc";

export interface TransactionTableProps {
  transactions: Transaction[];
  onBulkDelete?: (ids: string[]) => void | Promise<void>;
  onEdit?: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onBulkDelete,
  onEdit,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({ field: "date", direction: "desc" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<"" | TransactionType>("");
  const [recurringFilter, setRecurringFilter] = useState<
    "" | "recurring" | "non-recurring"
  >("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSort = (field: SortField) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((t) =>
        t.description?.toLowerCase().includes(searchLower)
      );
    }

    if (typeFilter) {
      result = result.filter((t) => t.type === typeFilter);
    }

    if (recurringFilter) {
      result = result.filter((t) =>
        recurringFilter === "recurring"
          ? Boolean(t.isRecurring)
          : !t.isRecurring
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const totalPages =
    Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE) || 1;

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);

  const handleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === paginatedTransactions.length
        ? []
        : paginatedTransactions.map((t) => t.id)
    );
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Delete ${selectedIds.length} transactions?`)) return;
    await onBulkDelete?.(selectedIds);
    setSelectedIds([]);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage((current) => {
      const next = direction === "prev" ? current - 1 : current + 1;
      return Math.min(Math.max(next, 1), totalPages);
    });
    setSelectedIds([]);
  };

  useEffect(() => {
    // Reset page to 1 when filters/search change
    setCurrentPage(1);
  }, [searchTerm, typeFilter, recurringFilter]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <TextField
          label="Search transactions"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="type-filter-label">Type</InputLabel>
          <Select
            labelId="type-filter-label"
            value={typeFilter}
            label="Type"
            onChange={(e) =>
              setTypeFilter(e.target.value as TransactionType | "")
            }
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="INCOME">Income</MenuItem>
            <MenuItem value="EXPENSE">Expense</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="recurring-filter-label">Transactions</InputLabel>
          <Select
            labelId="recurring-filter-label"
            value={recurringFilter}
            label="Transactions"
            onChange={(e) =>
              setRecurringFilter(e.target.value as typeof recurringFilter)
            }
          >
            <MenuItem value="">All Transactions</MenuItem>
            <MenuItem value="recurring">Recurring Only</MenuItem>
            <MenuItem value="non-recurring">Non-recurring Only</MenuItem>
          </Select>
        </FormControl>

        {selectedIds.length > 0 && (
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleBulkDelete}
          >
            Delete Selected ({selectedIds.length})
          </Button>
        )}

        {(searchTerm || typeFilter || recurringFilter) && (
          <Tooltip title="Clear filters">
            <span>
              <IconButton color="default" onClick={handleClearFilters}>
                <ClearIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Stack>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    selectedIds.length === paginatedTransactions.length &&
                    paginatedTransactions.length > 0
                  }
                  onChange={handleSelectAll}
                  inputProps={{ "aria-label": "select all" }}
                />
              </TableCell>
              <TableCell
                onClick={() => handleSort("date")}
                sx={{ cursor: "pointer", width: 160 }}
              >
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <span>Date</span>
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" />
                    ))}
                </Stack>
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell
                onClick={() => handleSort("category")}
                sx={{ cursor: "pointer" }}
              >
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <span>Category</span>
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" />
                    ))}
                </Stack>
              </TableCell>
              <TableCell
                align="right"
                onClick={() => handleSort("amount")}
                sx={{ cursor: "pointer", width: 160 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap={0.5}
                >
                  <span>Amount</span>
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" />
                    ))}
                </Stack>
              </TableCell>
              <TableCell>Recurring</TableCell>
              <TableCell align="center" width={56}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.includes(t.id)}
                      onChange={() => handleSelect(t.id)}
                    />
                  </TableCell>
                  <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    <Chip
                      label={t.category}
                      sx={{
                        color: "#fff",
                        backgroundColor: categoryColors[t.category] || "#888",
                        textTransform: "capitalize",
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 500,
                      color:
                        t.type === "EXPENSE" ? "error.main" : "success.main",
                    }}
                  >
                    {t.type === "EXPENSE" ? "-" : "+"}${t.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {t.isRecurring ? (
                      <Tooltip
                        title={`Next: ${
                          t.nextRecurringDate
                            ? new Date(t.nextRecurringDate).toLocaleDateString()
                            : "N/A"
                        }`}
                      >
                        <Chip
                          variant="outlined"
                          color="secondary"
                          label={
                            t.recurringInterval
                              ? RECURRING_INTERVALS[t.recurringInterval]
                              : "Recurring"
                          }
                          size="small"
                        />
                      </Tooltip>
                    ) : (
                      <Chip variant="outlined" label="One-time" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <span>
                        <IconButton size="small" onClick={() => onEdit?.(t.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <IconButton
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="body2">
            Page {currentPage} of {totalPages}
          </Typography>
          <IconButton
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};

export default TransactionTable;
