from django.contrib import admin
from .models import Standard, User, KnowShowChart, StandardSet, StudentDataEntry, PlanWeek, Assessment

# Register your models here.
admin.site.register(Standard)
admin.site.register(User)
admin.site.register(KnowShowChart)
admin.site.register(StandardSet)
admin.site.register(StudentDataEntry)
admin.site.register(PlanWeek)
admin.site.register(Assessment)
