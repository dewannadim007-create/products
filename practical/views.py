from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Product
import openpyxl


def landing(request):
    return render(request, 'landing.html')


def approved_products(request):
    products = Product.objects.filter(status='Approved')

    search = request.GET.get('search', '')
    date_from = request.GET.get('date_from', '')
    date_to = request.GET.get('date_to', '')
    per_page = request.GET.get('per_page', '5')

    if search:
        products = products.filter(
            Q(name__icontains=search) | Q(category__icontains=search)
        )
    if date_from:
        products = products.filter(last_updated__date__gte=date_from)
    if date_to:
        products = products.filter(last_updated__date__lte=date_to)

    paginator = Paginator(products, per_page)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    return render(request, 'approvedproducts.html', {
        'products': page_obj,
        'page_obj': page_obj,
    })


def draft_upload(request):
    if request.method == 'POST':
        excel_file = request.FILES.get('excel_file')

        if not excel_file or not excel_file.name.endswith('.xlsx'):
            messages.error(request, 'Please upload a valid .xlsx file.')
        else:
            try:
                wb = openpyxl.load_workbook(excel_file)
                ws = wb.active
                inserted = 0
                skipped_ids = []

                for row in ws.iter_rows(min_row=2, values_only=True):
                    product_id, name, category, price, quantity = row[:5]

                    if not product_id:
                        continue

                    existing = Product.objects.filter(product_id=product_id).first()

                    if existing:
                        skipped_ids.append(product_id)
                        continue

                    Product.objects.create(
                        product_id=product_id,
                        name=name,
                        category=category,
                        price=price,
                        quantity=quantity,
                        status='Draft',
                    )
                    inserted += 1

                if inserted:
                    messages.success(request, f'Upload successful: {inserted} new product(s) inserted.')

                if skipped_ids:
                    messages.error(request, f'The following Product IDs were not added since they already exist in the database: {", ".join(str(i) for i in skipped_ids)}')

            except Exception as e:
                messages.error(request, f'Error processing file: {str(e)}')

    products = Product.objects.filter(status='Draft').order_by('product_id')
    paginator = Paginator(products, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    return render(request, 'draftupload.html', {
        'products': page_obj,
        'page_obj': page_obj,
    })


def approve_product(request, product_id):

    if request.method == 'POST':
        product = get_object_or_404(Product, product_id=product_id)
        product.status = 'Approved'
        product.save()
        messages.success(request, f'Product "{product.name}" has been approved.')
    return redirect('draft_upload')

def edit_product(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)

    if request.method == 'POST':
        product.name = request.POST.get('name')
        product.category = request.POST.get('category')
        product.price = request.POST.get('price')
        product.quantity = request.POST.get('quantity')
        product.save()
        messages.success(request, f'Product "{product.name}" has been updated successfully.')
        return redirect('draft_upload')

    return render(request, 'edit_product.html', {'product': product})