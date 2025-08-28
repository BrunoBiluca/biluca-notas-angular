import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NotesService } from '../services/notes-service';
import { Note } from '../services/note.model';

interface OrderType {
  key: string;
  icon: string;
  title: string;
  comp: (n1: Note, n2: Note) => number;
}

@Component({
  selector: 'notes-order-selector',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './order-selector.html',
  styleUrl: './order-selector.scss',
})
export class OrderSelector {
  notesService = inject(NotesService);
  orders: OrderType[] = [
    {
      key: 'title_asc',
      icon: 'assets/icons/sort-a-z.svg',
      title: 'Título A-Z',
      comp: (n1: Note, n2: Note) => (n1.title.localeCompare(n2.title)),
    },
    {
      key: 'title_desc',
      icon: 'assets/icons/sort-z-a.svg',
      title: 'Título Z-A',
      comp: (n1: Note, n2: Note) => (n2.title.localeCompare(n1.title)),
    },
    {
      key: 'created_at_desc',
      icon: 'assets/icons/sort-by-time.svg',
      title: 'Mais antigo',
      comp: (n1: Note, n2: Note) => (n1.created_at < n2.created_at ? -1 : 1),
    },
  ];

  currentOrder = signal<OrderType>(this.orders[0]);

  chooseOrder(order: string) {
    const orderType = this.orders.find((o) => o.key === order);
    this.currentOrder.set(orderType!);
    this.notesService.setOrderFunc(orderType!.comp);
  }
}
