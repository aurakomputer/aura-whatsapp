<template>
    <div>
        <slot name="top">
            <div class="row q-col-gutter-sm items-center justify-between q-mb-md">
                <div class="col-12 col-md-auto">
                    <slot name="top-left"> </slot>
                </div>
                <div class="col-12 col-md-auto">
                    <slot name="top-right">
                        <div
                            :class="{
                                flex: true,
                                'q-px-md q-py-sm rounded shadow-1': true,
                                'bg-dark': $q.dark.isActive,
                                'bg-white': !$q.dark.isActive,
                            }"
                            v-if="showSearch"
                        >
                            <q-input
                                dense
                                type="search"
                                outlined
                                clearable
                                debounce="400"
                                v-model="search"
                                :placeholder="'Pencarian'"
                            >
                                <template v-slot:append>
                                    <q-icon name="mdi-magnify" />
                                </template>
                            </q-input>
                            <q-btn
                                v-if="!!this.$slots['filter']"
                                dense
                                icon="mdi-filter-outline"
                                flat
                                round
                                @click="showFilter = !showFilter"
                                color="blue-5"
                            >
                                <q-tooltip>{{ 'Filter Data' }}</q-tooltip>
                            </q-btn>

                            <q-btn dense icon="mdi-refresh" flat round @click="refresh" color="primary">
                                <q-tooltip>Refresh Table</q-tooltip>
                            </q-btn>
                            <q-btn
                                dense
                                :icon="!grid ? 'mdi-view-grid-outline' : 'mdi-view-list-outline'"
                                flat
                                round
                                @click="grid = !grid"
                                color="secondary"
                            >
                                <q-tooltip>Ubah Tampilan</q-tooltip>
                            </q-btn>

                            <!-- <q-select -->
                            <!--     v-model="visibleColumns" -->
                            <!--     multiple -->
                            <!--     outlined -->
                            <!--     dense -->
                            <!--     options-dense -->
                            <!--     :display-value="$q.lang.table.columns" -->
                            <!--     emit-value -->
                            <!--     map-options -->
                            <!--     :options="columns" -->
                            <!--     option-value="name" -->
                            <!--     options-cover -->
                            <!--     style="min-width: 150px" -->
                            <!-- /> -->
                        </div>
                    </slot>
                </div>
            </div>
        </slot>
    </div>

    <div v-if="!!this.$slots['filter'] && showFilter" class="q-mb-md">
        <slot name="filter"></slot>
    </div>
    <q-table
        ref="datatables"
        :loading="loading"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :title="title"
        :class="tableClass"
        :filter="search"
        :grid="grid"
        :selection="selection"
    >
        <template v-slot:no-data>
            <no-items></no-items>
        </template>

        <!-- slot action -->
        <template v-slot:body-cell-actions="props">
            <q-td :props="props">
                <slot name="action" :props="props"> </slot>
            </q-td>
        </template>

        <template v-for="(item, index) in customTd" v-slot:[`body-cell-${item}`]="props" :key="`customTd${index}`">
            <q-td>
                <slot :name="`custom-${item}`" :props="props"> </slot>
            </q-td>
        </template>

        <template v-slot:header-selection>
            <q-checkbox v-model="selectAll" />
        </template>

        <template v-slot:body-selection="{ row }">
            <q-checkbox v-model="selected" :val="row.id" />
        </template>

        <template v-slot:item="props">
            <slot name="custom-grid" :props="props">
                <div
                    class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                    :style="props.selected ? 'transform: scale(0.95);' : ''"
                >
                    <q-card :class="props.selected ? 'bg-grey-2' : ''">
                        <q-card-section>
                            <div class="q-table__grid-item-row" v-for="col in props.cols" :key="col.name">
                                <div class="q-table__grid-item-title">
                                    {{ col.label }}
                                </div>
                                <div class="q-table__grid-item-value" style="text-align: left !important">
                                    <div v-if="!customTd.includes(col.name)" :class="col.classes ? col.classes : ''">
                                        {{ col.value }}
                                    </div>
                                    <template v-else>
                                        <slot :name="`custom-${col.name}`" :props="props"> </slot>
                                    </template>

                                    <div v-if="col.name == 'actions'">
                                        <slot name="action" :props="props"> </slot>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </slot>
        </template>
    </q-table>
</template>

<script>
import NoItems from './NoItems.vue'
import LogoAnimation from './LogoAnimation.vue'
import api from '../helpers/api.js'
import { Screen } from 'quasar'

export default {
    name: 'DataTable',
    components: {
        NoItems,
        LogoAnimation,
    },
    emits: ['selected'],
    props: {
        append: String,
        include: String,
        hide: String,
        rowClick: {
            default: undefined,
        },
        columns: {
            type: Array,
            default: () => {
                return []
            },
        },
        url: {
            type: String,
        },
        tableClass: {
            type: String,
        },
        title: {
            type: String,
        },
        showSearch: {
            type: Boolean,
            default: true,
        },
        filter: {
            type: Object,
        },
        defaultSort: {
            type: String,
            default: 'created_at',
        },
        defaultSortDescending: {
            type: Boolean,
            default: true,
        },
        customTd: {
            type: Array,
            default: () => {
                return []
            },
        },
        gridView: {
            type: Boolean,
            default: () => {
                return Screen.lt.md
            },
        },
        selection: String,
        modelSelected: Array,
        moreParams: Object,
        showFilter: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        const visibleColumns = this.columns.map((x) => x.name)
        return {
            loading: true,
            grid: this.gridView,
            visibleColumns: visibleColumns,
            search: '',
            selected: [],
            rows: [],
        }
    },
    methods: {
        getDatatables() {
            this.loading = true
            /* this.$set(this.$data, "loading", true); */
            return api
                .get(this.url)
                .then((d) => {
                    this.rows = d.rows
                })
                .finally(() => {
                    this.loading = false
                })
                .catch((e) => {
                    window.console.log(e)
                })
        },
        refresh() {
            this.getDatatables()
        },
    },
    watch: {
        selected(value) {
            this.$emit('selected', value)
        },
        filter: {
            handler() {
                this.refresh()
            },
            deep: true,
        },
    },
    computed: {
        selectAll: {
            get() {
                return this.rows.length > 0 && this.selected.length == this.rows.length
            },
            set(value) {
                if (value) {
                    let rows = []
                    this.rows.forEach((x) => {
                        rows.push(x.id)
                    })

                    this.selected = rows
                } else {
                    this.selected = []
                }
            },
        },
    },
    created() {
        this.refresh()
    },
}
</script>
