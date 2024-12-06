<?php

namespace App\Enum\Master\MAssistanceDistributionReport;

enum AssistanceDistributionReportStatus: string
{
    case PENDING = 'pending';
    case APPROVE = 'approve';
    case REJECT = 'reject';
}
