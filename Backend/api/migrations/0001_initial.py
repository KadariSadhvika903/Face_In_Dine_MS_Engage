# Generated by Django 4.0.4 on 2022-05-24 11:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(max_length=2550, primary_key=True, serialize=False, verbose_name='User Name')),
                ('name', models.CharField(max_length=200, verbose_name='Name')),
                ('type', models.CharField(choices=[('Customer', 'CUSTOMER'), ('Restaurant', 'RESTAURANT')], default='Customer', max_length=50, verbose_name='Type')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CuisineType',
            fields=[
                ('cuisineId', models.AutoField(primary_key=True, serialize=False, verbose_name='Cuisine ID')),
                ('name', models.CharField(max_length=200, verbose_name='Cuisine Name')),
            ],
        ),
        migrations.CreateModel(
            name='Dish',
            fields=[
                ('dishId', models.AutoField(primary_key=True, serialize=False, verbose_name='Dish ID')),
                ('name', models.CharField(max_length=250, verbose_name='Dish Name')),
                ('price', models.IntegerField()),
                ('cuisine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cuisinetype')),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('phoneNo', models.CharField(max_length=13, verbose_name='Phone Number')),
                ('upiId', models.CharField(max_length=100, verbose_name='UPI ID')),
                ('picLink', models.CharField(max_length=250, verbose_name='Profile Picture Link')),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('phoneNo', models.CharField(max_length=13, verbose_name='Phone Number')),
                ('restaurantName', models.CharField(max_length=250, verbose_name='Restaurant Name')),
                ('upiId', models.CharField(max_length=100, verbose_name='UPI ID')),
                ('picLink', models.CharField(max_length=250, verbose_name='Restaurant Picture')),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('orderId', models.AutoField(primary_key=True, serialize=False, verbose_name='Order ID')),
                ('orderStatus', models.CharField(choices=[('Pending', 'PENDING'), ('Complete', 'COMPLETE')], default='Pending', max_length=50, verbose_name='Order Status')),
                ('paymentStatus', models.CharField(choices=[('Pending', 'PENDING'), ('Complete', 'COMPLETE')], default='Pending', max_length=50, verbose_name='Payment Status')),
                ('dishes', models.ManyToManyField(related_name='dishes', to='api.dish')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customer')),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurant')),
            ],
        ),
        migrations.AddField(
            model_name='dish',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurant'),
        ),
    ]
