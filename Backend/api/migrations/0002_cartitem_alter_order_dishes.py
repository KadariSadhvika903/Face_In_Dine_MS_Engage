# Generated by Django 4.0.4 on 2022-05-26 16:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.dish')),
            ],
        ),
        migrations.AlterField(
            model_name='order',
            name='dishes',
            field=models.ManyToManyField(related_name='dishes', to='api.cartitem'),
        ),
    ]
