import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar-anuncio',
  templateUrl: './sidebar-anuncio.component.html',
  styleUrls: ['./sidebar-anuncio.component.css']
})
export class SidebarAnuncioComponent {
  @Output() limpiarFiltrosClick = new EventEmitter<void>();
  @Output() citySelected = new EventEmitter<string>();
  @Output() dateSelected = new EventEmitter<Date>();
  ciudades: { label: string, value: string }[] = [
    { label: 'Madrid', value: 'Madrid' },
    { label: 'Barcelona', value: 'Barcelona' },
    { label: 'Valencia', value: 'Valencia' },
    { label: 'Sevilla', value: 'Sevilla' },
    { label: 'Zaragoza', value: 'Zaragoza' },
    { label: 'Málaga', value: 'Málaga' },
    { label: 'Murcia', value: 'Murcia' },
    { label: 'Palma', value: 'Palma' },
    { label: 'Bilbao', value: 'Bilbao' },
    { label: 'Alicante', value: 'Alicante' }
  ];

  selectedCity: string | undefined;
  selectedDate: Date | undefined;

  onCitySelect(): void {
    this.citySelected.emit(this.selectedCity);
  }

  onDateSelect(): void {
    this.dateSelected.emit(this.selectedDate);
  }


  limpiarFiltros(): void {
    this.limpiarFiltrosClick.emit();
  }
  
}
